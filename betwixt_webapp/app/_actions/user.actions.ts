'use server';
 
import { cookies } from 'next/headers';
 
export async function getAuthToken() {
    return cookies().get('authToken');
}

export async function handleLogin(authToken: string) {
//   const encryptedSessionData = encrypt(sessionData) // Encrypt your session data
  cookies().set('authToken', authToken, {
    httpOnly: true,
    secure: true,
    // secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  })
  // Redirect or handle the response after setting the cookie
}

export async function handleLogout() {
    cookies().delete('authToken');
    cookies().delete('cart');
}