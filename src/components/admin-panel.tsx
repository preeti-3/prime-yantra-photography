"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { imageSlots, type ImageOverrides } from "@/lib/image-slots";
import styles from "./admin-panel.module.css";

export function AdminPanel({ authenticated, adminReady, cmsReady }: { authenticated: boolean; adminReady: boolean; cmsReady: boolean }) {
  const [signedIn, setSignedIn] = useState(authenticated);
  const [images, setImages] = useState<ImageOverrides>({});
  const [group, setGroup] = useState("Home");
  const [selected, setSelected] = useState<string | null>(null);
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [restoreConfirm, setRestoreConfirm] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const editor = useRef<HTMLDialogElement>(null);
  const previewUrl = useRef("");
  const slot = imageSlots.find((item) => item.id === selected);

  useEffect(() => {
    if (!signedIn || !cmsReady) return;
    const controller = new AbortController();
    fetch("/api/images", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load saved images. Check your Sanity connection and reload this page.");
        setImages(await response.json());
      }).catch((cause) => { if (!controller.signal.aborted) setError(cause.message); });
    return () => controller.abort();
  }, [signedIn, cmsReady]);

  useEffect(() => () => {
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
  }, []);

  useEffect(() => {
    if (selected) editor.current?.showModal();
    else editor.current?.close();
  }, [selected]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(data)) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not sign in.");
      setSignedIn(true);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not sign in."); }
    finally { setBusy(false); }
  }

  async function logout() {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin/session", { method: "DELETE" });
      if (!response.ok) throw new Error("Could not sign out. Please try again.");
      setSignedIn(false); setImages({}); setSelected(null); setMessage("");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not sign out."); }
    finally { setBusy(false); }
  }

  function selectFile(nextFile: File | null) {
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    previewUrl.current = nextFile ? URL.createObjectURL(nextFile) : "";
    setPreview(previewUrl.current);
    setFile(nextFile);
  }

  function edit(id: string) {
    selectFile(null); setAlt(images[id]?.alt || ""); setError(""); setMessage(""); setRestoreConfirm(false); setSelected(id);
    if (fileInput.current) fileInput.current.value = "";
  }

  async function publish(reset = false) {
    if (!slot || (!reset && !file)) return;
    setBusy(true); setError(""); setMessage("");
    try {
      const form = new FormData();
      form.set("slot", slot.id); form.set("alt", alt.trim());
      if (file) form.set("image", file);
      const response = await fetch("/api/admin/images", reset
        ? { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slot: slot.id }) }
        : { method: "POST", body: form });
      const result = await response.json();
      if (response.status === 401) { setSignedIn(false); setSelected(null); }
      if (!response.ok) throw new Error(result.error || "Could not save the image.");
      let refreshedSuccessfully = false;
      try {
        const refreshed = await fetch("/api/images", { cache: "no-store" });
        if (refreshed.ok) { setImages(await refreshed.json()); refreshedSuccessfully = true; }
      } catch { /* Publishing already succeeded; report a preview refresh failure separately. */ }
      window.dispatchEvent(new Event("images-updated"));
      setSelected(null); selectFile(null);
      setMessage(!refreshedSuccessfully ? "Image saved. Reload this page to refresh the preview." : reset ? "Original image restored." : "Image published. It is now live on your website.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again."); }
    finally { setBusy(false); }
  }

  return (
    <section className={`${styles.admin} page-width`}>
      <div className={styles.heading}>
        <div><p className="eyebrow">Prime Yantra Photography</p><h1>Image studio</h1><p>Fresh photographs. The same beautiful website.</p></div>
        {signedIn && <div className={styles.actions}><a className={styles.secondary} href="/" target="_blank" rel="noreferrer">View website ↗</a><button className={styles.secondary} disabled={busy} onClick={logout}>Sign out</button></div>}
      </div>

      {!adminReady ? <div className={styles.notice}><h2>Admin setup needed</h2><p>Your website is working. To enable image management, ask your developer to configure admin access and connect your Sanity project.</p></div> : !signedIn ? (
        <form onSubmit={login} className={styles.login}>
          <h2>Welcome back</h2><p>Sign in to replace your website photographs.</p>
          <label>Username<input name="username" autoComplete="username" required maxLength={100} /></label>
          <label>Password<input name="password" type="password" autoComplete="current-password" required maxLength={1024} /></label>
          <button className="button button-dark" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        </form>
      ) : !cmsReady ? <div className={styles.notice}><h2>Connect your image library</h2><p>Admin access is ready. Your developer needs to connect your Sanity project before you can upload photographs.</p></div> : (
        <>
          <p className={styles.intro}>Choose a photo below, upload its replacement, then publish. Changes appear on your website without a code update.</p>
          <div role="group" aria-label="Page filter" className={styles.filters}>
            {["Home", "Portfolio", "About", "Branding"].map((name) => <button key={name} aria-pressed={group === name} onClick={() => setGroup(name)}>{name}</button>)}
          </div>
          <div className={styles.grid}>
            {imageSlots.filter((item) => item.group === group).map((item) => (
              <article key={item.id} className={styles.card}>
                {/* Admin previews include local and uploaded images without optimization. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={images[item.id]?.url || item.src} alt={images[item.id]?.alt || item.label} loading="lazy" />
                <div className={styles.cardBody}><span className={styles.badge}>{images[item.id] ? "Custom image" : "Original image"}</span><h2>{item.label}</h2><button className={styles.replace} onClick={() => edit(item.id)}>Replace image <span aria-hidden="true">↗</span></button></div>
              </article>
            ))}
          </div>
          <dialog ref={editor} className={styles.dialog} aria-labelledby="image-editor-title" onCancel={(event) => { if (busy) event.preventDefault(); else setSelected(null); }} onClose={() => { if (!busy) setSelected(null); }}>
            {slot && <form onSubmit={(event) => { event.preventDefault(); void publish(); }}>
              <div className={styles.editorHeading}><div><p className="eyebrow">{slot.group}</p><h2 id="image-editor-title">{slot.label}</h2></div><button type="button" className={styles.close} aria-label="Close image editor" disabled={busy} onClick={() => setSelected(null)}>×</button></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.preview} src={preview || images[slot.id]?.url || slot.src} alt={alt || slot.label} />
              <label className={styles.upload}>Choose a replacement<input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={busy} onChange={(event) => {
                const candidate = event.target.files?.[0]; setError(""); setRestoreConfirm(false);
                if (!candidate) { selectFile(null); return; }
                if (candidate.size > 4 * 1024 * 1024 || candidate.size === 0) { setError("Choose a non-empty image smaller than 4 MB."); selectFile(null); event.target.value = ""; return; }
                if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(candidate.type)) { setError("Choose a JPG, PNG, WebP or GIF image."); selectFile(null); event.target.value = ""; return; }
                selectFile(candidate);
              }} /><span>JPG, PNG, WebP or GIF · up to 4 MB</span></label>
              <label className={styles.alt}>Image description<input value={alt} onChange={(event) => setAlt(event.target.value)} placeholder="For example, a couple at their wedding ceremony" required maxLength={300} disabled={busy} /><span>A short description for visitors using screen readers.</span></label>
              {error && <p role="alert" className={styles.error}>{error}</p>}
              <div className={styles.actions}><button className="button button-dark" disabled={busy || !file || !alt.trim()}>{busy ? "Saving…" : "Publish replacement"}</button><button type="button" className={styles.secondary} disabled={busy} onClick={() => setSelected(null)}>Cancel</button></div>
              {images[slot.id] && <div className={styles.restore}>{restoreConfirm ? <><p>Restore the original photo at this position?</p><button type="button" disabled={busy} onClick={() => publish(true)}>Yes, restore original</button><button type="button" disabled={busy} onClick={() => setRestoreConfirm(false)}>Keep current photo</button></> : <button type="button" disabled={busy} onClick={() => setRestoreConfirm(true)}>Restore original image</button>}</div>}
            </form>}
          </dialog>
        </>
      )}
      {message && <p className={styles.success} role="status">{message}</p>}
      {error && !selected && <p className={styles.error} role="alert">{error}</p>}
    </section>
  );
}
