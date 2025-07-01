import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is missing")
      return NextResponse.json(
        { success: false, message: "Email service is not configured. Please try again later." },
        { status: 500 },
      )
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY)

      // Send the email - using the correct from address
      const result = await resend.emails.send({
        from: "onboarding@resend.dev", // This is the key change - use Resend's verified domain
        to: ['delivered@resend.dev'],
        subject: `Digital Literacy Hub Contact Form: Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h3 style="color: #374151; margin-top: 0;">Message</h3>
              <p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, "<br>")}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 8px; border-left: 4px solid #2563eb;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                This message was sent via the Digital Literacy Hub contact form at ${new Date().toLocaleString()}.
              </p>
            </div>
          </div>
        `,
        reply_to: email, // This allows replies to go to the original sender
      })

      console.log("Email sent successfully:", result)

      return NextResponse.json({
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
      })
    } catch (emailError: any) {
      console.error("Resend API error:", emailError)

      // Return a more specific error message
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send email. Please try again or contact us directly.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your request. Please try again." },
      { status: 500 },
    )
  }
}
