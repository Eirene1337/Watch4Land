export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const a1232 = process.env.a1232;

    if (!a1232) {
        return res.status(500).end();
    }

    const target = req.query.target || "unknown";

    const h = req.headers;

    const ip =
        h["x-forwarded-for"]?.split(",")[0]?.trim() ||
        h["x-real-ip"] ||
        "Unknown";

    const country = h["x-vercel-ip-country"] || "Unknown";
    const city = h["x-vercel-ip-city"] || "Unknown";
    const ua = h["user-agent"] || "Unknown";

    function getBrowser(x) {
        if (/Edg/i.test(x)) return "Microsoft Edge";
        if (/Chrome/i.test(x)) return "Google Chrome";
        if (/Firefox/i.test(x)) return "Firefox";
        if (/Safari/i.test(x)) return "Safari";
        return "Unknown";
    }

    function getOS(x) {
        if (/Windows/i.test(x)) return "Windows";
        if (/Android/i.test(x)) return "Android";
        if (/iPhone|iPad|iPod/i.test(x)) return "iOS";
        if (/Mac OS/i.test(x)) return "macOS";
        if (/Linux/i.test(x)) return "Linux";
        return "Unknown";
    }

    const device =
        /Mobile|Android|iPhone|iPad/i.test(ua)
            ? "Mobile"
            : "Desktop";

    try {
        await fetch(a1232, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                embeds: [{
                    title: "Watch4Land | Download",
                    description: "A visitor started a download.",
                    color: 11027200,
                    fields: [
                        {
                            name: "Launcher",
                            value: `\`${target}\``,
                            inline: true
                        },
                        {
                            name: "IP",
                            value: `\`${ip}\``,
                            inline: true
                        },
                        {
                            name: "Country",
                            value: `\`${country}\``,
                            inline: true
                        },
                        {
                            name: "City",
                            value: `\`${city}\``,
                            inline: true
                        },
                        {
                            name: "Browser",
                            value: `\`${getBrowser(ua)}\``,
                            inline: true
                        },
                        {
                            name: "OS",
                            value: `\`${getOS(ua)}\``,
                            inline: true
                        },
                        {
                            name: "Device",
                            value: `\`${device}\``,
                            inline: true
                        }
                    ],
                    footer: {
                        text: "Watch4Land Download System"
                    },
                    timestamp: new Date().toISOString()
                }]
            })
        });

        return res.status(204).end();

    } catch {
        return res.status(500).end();
    }
}