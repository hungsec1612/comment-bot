exports.handler = async function () {

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/campaigns`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_SECRET_KEY,
                "Authorization": `Bearer ${SUPABASE_SECRET_KEY}`,
                "Prefer": "return=representation"
            },

            body: JSON.stringify({
                name: "Test Campaign",
                status: "active",
                link: "https://example.com"
            })
        }
    );

    const data = await response.json();

    return {
        statusCode: response.ok ? 200 : response.status,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)
    };
};
