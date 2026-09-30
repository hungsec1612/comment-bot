exports.handler = async function (event) {

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

    try {

        // GET: lấy danh sách campaign
        if (event.httpMethod === "GET") {

            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/campaigns?select=*&order=created_at.desc`,
                {
                    method: "GET",
                    headers: {
                        "apikey": SUPABASE_SECRET_KEY,
                        "Authorization": `Bearer ${SUPABASE_SECRET_KEY}`
                    }
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
        }


        // POST: tạo campaign mới
        if (event.httpMethod === "POST") {

            const body = JSON.parse(event.body || "{}");

            const name = body.name;
            const link = body.link;

            if (!name || !link) {

                return {
                    statusCode: 400,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: "Thiếu tên hoặc link campaign."
                    })
                };
            }


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
                        name: name,
                        status: "active",
                        link: link
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
        }


        return {
            statusCode: 405,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Method not allowed"
            })
        };


    } catch (error) {

        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: error.message
            })
        };
    }
};
