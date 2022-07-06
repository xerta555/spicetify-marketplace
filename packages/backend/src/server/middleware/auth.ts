// create an auth route that takes a access token as input
// and returns a user object if the token is valid
// otherwise returns an error
import { Request, Response } from "express";

export async function auth (req: Request, res: Response, next: Function) {
    const { accessToken } = req.body.token;
    if (!accessToken) {
        return res.json(
            {
                success: false,
                message: "No access token provided"
            }
        )
            .end();
    }
    const user = await getUserFromAccessToken(accessToken);
    if (user.error) {
        return res.json(
            {
                success: false,
                message: "Invalid access token"
            }
        )
            .end();
    }
    return res.json(
        {
            success: true,
            user: {
                user
            },
            accessToken: accessToken.slice(0, 10),
        }
    )
        .end();
}


const getUserFromAccessToken: (accessToken: string) => Promise<any> = async (accessToken: string) => {
   // Use accesstoken to make a request to https://api.spotify.com/v1/me
   const url = `https://api.spotify.com/v1/me`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const user = await response.json();
    console.log(user);
    return user;
}


