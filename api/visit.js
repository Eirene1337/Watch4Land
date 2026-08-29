export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const a1232 = process.env.a1232;

    if (!a1232) {
        return res.status(500).end();
    }

    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        "Unknown";

    try {
        await fetch(a1232, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                embeds: [{
                    title: "a3212",
                    description: "New visitor entered the website.",
                    color: 10181046,
                    fields: [{
                        name: "IP",
                        value: `\`${ip}\``,
                        inline: true
                    }],
                    timestamp: new Date().toISOString()
                }]
            })
        });

        return res.status(204).end();
    } catch {
        return res.status(500).end();
    }
}
