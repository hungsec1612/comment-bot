exports.handler = async function () {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            hasUrl: !!SUPABASE_URL,
            hasSecretKey: !!SUPABASE_SECRET_KEY,
            keyLength: SUPABASE_SECRET_KEY ? SUPABASE_SECRET_KEY.length : 0
        })
    };
};
