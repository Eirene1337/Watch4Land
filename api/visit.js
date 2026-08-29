export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const webhook = process.env.DISCORD_WEBHOOK;

    if (!webhook) {
        return res.status(500).end();
    }

    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.headers["x-real-ip"] ||
        "Unknown";

    const embed = {
        embeds: [
            {
                title: "New Website Visit",
                description: "A new visitor has entered Watch4Land.",
                color: 10181046,
                fields: [
                    {
                        name: "Visitor IP",
                        value: `\`${ip}\``,
                        inline: true
                    },
                    {
                        name: "Status",
                        value: "Online",
                        inline: true
                    }
                ],
                footer: {
                    text: "Watch4Land"
                },
                timestamp: new Date().toISOString()
            }
        ]
    };

    try {
        const response = await fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(embed)
        });

        if (!response.ok) {
            return res.status(502).end();
        }

        return res.status(204).end();
    } catch {
        return res.status(500).end();
    }
}