import Token from "jsonwebtoken"

const genrateToken = (res, user, message) => {

    const token = Token.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    //  Set a cookie with the token
    res.status(200).cookie('token', token,
        {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        }).json({ //  Send a response with a success message and the token
            success: true,
            message,
            user
        })
}

export default genrateToken