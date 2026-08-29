export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).send("METHOD");
    }

    const x = process.env.a1232;

    if (!x) {
        return res.status(500).send("ENV_MISSING");
    }

    try {
        const r = await fetch(x, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: "New visitor entered Watch4Land."
            })
        });

        const body = await r.text();

        console.log("TARGET STATUS:", r.status);
        console.log("TARGET RESPONSE:", body);

        if (!r.ok) {
            return res.status(500).send("TARGET_" + r.status);
        }

        return res.status(200).send("OK");

    } catch (error) {
        console.error(error);
        return res.status(500).send("ERROR_" + error.message);
    }
}
