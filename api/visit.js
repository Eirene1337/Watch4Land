export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).send("NO");
    }

    const a1232 = process.env.a1232;

    if (!a1232) {
        return res.status(500).send("ENV NO");
    }

    try {
        const r = await fetch(a1232, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                embeds: [{
                    title: "a3212",
                    description: "New visitor",
                    color: 10181046,
                    timestamp: new Date().toISOString()
                }]
            })
        });

        if (!r.ok) {
            return res.status(500).send("SEND NO " + r.status);
        }

        return res.status(200).send("OK");

    } catch (e) {
        return res.status(500).send("ERROR");
    }
}
