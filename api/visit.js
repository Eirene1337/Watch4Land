export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const a1232 = process.env.a1232;

    if (!a1232) {
        return res.status(500).end();
    }

    const headers = req.headers;

    const ip =
        headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        headers["x-real-ip"] ||
        "Unknown";

    const country =
        headers["x-vercel-ip-country"] ||
        "Unknown";

    const city =
        headers["x-vercel-ip-city"] ||
        "Unknown";

    const userAgent =
        headers["user-agent"] ||
        "Unknown";

    const referer =
        headers["referer"] ||
        "Direct";

    function getBrowser(ua) {
        if (/Edg/i.test(ua)) return "Microsoft Edge";
        if (/Chrome/i.test(ua)) return "Google Chrome";
        if (/Firefox/i.test(ua)) return "Mozilla Firefox";
        if (/Safari/i.test(ua)) return "Safari";
        if (/Opera|OPR/i.test(ua)) return "Opera";
        return "Unknown";
    }

    function getOS(ua) {
        if (/Windows/i.test(ua)) return "Windows";
        if (/Android/i.test(ua)) return "Android";
        if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
        if (/Mac OS/i.test(ua)) return "macOS";
        if (/Linux/i.test(ua)) return "Linux";
        return "Unknown";
    }

    function getDevice(ua) {
        if (/Mobile|Android|iPhone/i.test(ua)) return "Mobile";
        if (/iPad|Tablet/i.test(ua)) return "Tablet";
        return "Desktop";
    }

    const browser = getBrowser(userAgent);
    const os = getOS(userAgent);
    const device = getDevice(userAgent);

    const data = {
        embeds: [
            {
                title: "Watch4Land | New Visitor",
                description:
                    "A new visitor has entered the website.",
                color: 11027200,

                fields: [
                    {
                        name: "Visitor IP",
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
                        value: `\`${browser}\``,
                        inline: true
                    },
                    {
                        name: "Operating System",
                        value: `\`${os}\``,
                        inline: true
                    },
                    {
                        name: "Device",
                        value: `\`${device}\``,
                        inline: true
                    },
                    {
                        name: "Referrer",
                        value: `\`${referer}\``,
                        inline: false
                    }
                ],

                footer: {
                    text: "Watch4Land Visitor System"
                },

                timestamp: new Date().toISOString()
            }
        ]
    };

    try {
        const response = await fetch(a1232, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            return res.status(502).end();
        }

        return res.status(204).end();

    } catch {
        return res.status(500).end();
    }
}
