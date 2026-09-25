"use client";
import { useState, useRef, type FormEvent } from "react";
import { arrangements } from "@/config/catalog";
export function ContactForm({
  arrangement = "",
  size = "",
  event = false,
}: {
  arrangement?: string;
  size?: string;
  event?: boolean;
}) {
  const [selected, setSelected] = useState(arrangement);
  const [chosenSize, setSize] = useState(size);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const inFlight = useRef(false);
  const item = arrangements.find((a) => a.slug === selected);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    if (
      !["name", "email", "message"].every((key) =>
        String(data.get(key) || "").trim(),
      )
    ) {
      setError("Please complete your name, email and message.");
      setState("error");
      return;
    }
    if (
      process.env.NEXT_PUBLIC_FORMS_ENABLED !== "true" ||
      ["localhost", "127.0.0.1", "::1", "[::1]"].includes(
        window.location.hostname,
      )
    ) {
      setError(
        "This demonstration form is not accepting enquiries yet. Your message has not been sent.",
      );
      setState("error");
      return;
    }
    inFlight.current = true;
    setState("sending");
    setError("");
    try {
      const body = new URLSearchParams();
      data.forEach((v, k) => body.append(k, String(v)));
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error("Submission failed");
      setState("success");
      form.reset();
    } catch {
      setError(
        "We couldn’t send your enquiry. Please try again. Your details are still here.",
      );
      setState("error");
    } finally {
      inFlight.current = false;
    }
  }
  if (state === "success")
    return (
      <div className="success-message" role="status">
        <p className="eyebrow">Thank you</p>
        <h2>Your idea is in good hands.</h2>
        <p>
          Your enquiry has been received. The florist will confirm availability
          and details with you. Your order is not yet booked or paid.
        </p>
        <button
          className="button button-outline"
          onClick={() => setState("idle")}
        >
          Send another enquiry
        </button>
      </div>
    );
  return (
    <form
      name="flower-enquiry"
      onSubmit={submit}
      className="enquiry-form"
      method="POST"
      action="/__forms.html"
    >
      <input type="hidden" name="form-name" value="flower-enquiry" />
      <div hidden>
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-grid">
        <label>
          Your name <span>*</span>
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          Email address <span>*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
          />
        </label>
        <label>
          Phone <small>(optional)</small>
          <input type="tel" name="phone" autoComplete="tel" maxLength={40} />
        </label>
        <label>
          I’m enquiring about
          <select
            name="enquiry-type"
            defaultValue={
              event
                ? "Wedding or event"
                : arrangement
                  ? "Arrangement"
                  : "General enquiry"
            }
          >
            {[
              "General enquiry",
              "Arrangement",
              "Wedding or event",
              "Custom flowers",
            ].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          Arrangement <small>(optional)</small>
          <select
            name="arrangement"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              setSize("");
            }}
          >
            <option value="">Help me choose</option>
            {arrangements.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Size <small>(optional)</small>
          <select
            name="size"
            value={chosenSize}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Let’s discuss</option>
            {(item?.sizes ?? []).map((s) => (
              <option key={s.label}>{s.label}</option>
            ))}
          </select>
        </label>
        <label>
          Preferred date <small>(optional)</small>
          <input type="date" name="preferred-date" />
        </label>
        <label>
          Preference <small>(optional)</small>
          <select name="fulfilment">
            <option value="">Let’s discuss</option>
            <option>Delivery</option>
            <option>Pickup</option>
          </select>
        </label>
      </div>
      <label>
        Your message <span>*</span>
        <textarea
          name="message"
          rows={5}
          required
          maxLength={4000}
          placeholder="Tell us about the occasion, colours you love, and any special requests."
        />
      </label>
      <p className="small muted">
        Dates and delivery are requests, subject to confirmation. We’ll use your
        details to respond to your enquiry.
      </p>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="button" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send your enquiry"}{" "}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
