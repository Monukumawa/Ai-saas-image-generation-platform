import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const { token } = req.headers;
    
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }
    
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // 🔥 FIX: Force req.body to be an object if it is undefined
        req.body = req.body || {}; 

        const extractedId = tokenDecode.id || tokenDecode._id;

        if (extractedId) {
            req.body.userId = extractedId; // Safely injecting the ID
            next(); 
        } else {
            return res.json({ success: false, message: 'Invalid Token Payload. Login Again' });
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default userAuth;