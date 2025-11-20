import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
    name: z
        .string()
        .min(1, { message: "name is required." })
        .transform((s) => s.trim()),
    email: z
        .string()
        .min(1, { message: "email is required." })
        .email({ message: "email is invalid." })
        .transform((s) => s.trim()),
    message: z
        .string()
        .min(1, { message: "message is required." })
        .max(5000, { message: "message is too long." })
        .transform((s) => s.trim()),
    subject: z
        .string()
        .optional()
        .transform((s) => (s ?? "").trim()),
});

function validateBody(input) {
    const result = contactSchema.safeParse(input);

    if (!result.success) {
        const errors = result.error.errors.map((e) => e.message ?? "Invalid input.");
        return { ok: false, errors };
    }

    const { name, email, message, subject } = result.data;
    const defaultSubject = `New message from ${name || "contact form"}`;
    const finalSubject = (subject || defaultSubject).slice(0, 200);

    return {
        ok: true,
        errors: [],
        sanitized: {
            name,
            email,
            message,
            subject: finalSubject,
        },
    };
}

export function GET() {
  return Response.json({ error: "Method Not Allowed" }, { status: 405 });
}

export async function POST(req) {
    // Parse JSON body
    let body;
    try {
        body = await req.json();
    } catch (err) {
        return Response.json({ ok: false, message: "Invalid JSON body." }, {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Validate
    const { ok, errors, sanitized } = validateBody(body);
    if (!ok) {
        return Response.json({ ok: false, message: "Validation failed.", errors }, {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Ensure recipient and sender env vars are set
    const FROM = process.env.RESEND_FROM
    const TO = process.env.RESEND_TO
    if (!TO) {
        return Response.json(
            { ok: false, message: "Server misconfiguration: recipient email not set." },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    // make email
    const html = `
        <p><strong>Name:</strong> ${escapeHtml(sanitized.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(sanitized.email)}</p>
        <p><strong>Message:</strong></p>
        <div>${escapeHtml(sanitized.message).replace(/\n/g, "<br/>")}</div>
    `;

    try {
        const { data, error } = await resend.emails.send({
            from: FROM,
            to: TO,
            subject: sanitized.subject,
            html,
            // optional: set reply-to so replies go to sender
            reply_to: sanitized.email,
        });

        if (error) {
            return Response.json({ ok: false, message: "Failed to send email.", error }, {
                status: 502,
                headers: { "Content-Type": "application/json" },
            });
        }

        // success
        return Response.json({ ok: true, message: "Email sent", data }, {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return Response.json({ ok: false, message: "Internal server error.", error: String(err) }, {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// for avoiding injection in email HTML
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}