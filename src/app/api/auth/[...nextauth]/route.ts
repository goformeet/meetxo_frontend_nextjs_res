import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Phone',
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
        login_device_details: {label: "DeviceDetails", type: "text"}
      },
      async authorize(credentials) {

        try {
            const deviceDetails = credentials?.login_device_details 
            ? JSON.parse(credentials.login_device_details)
            : {};
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-otp`, {
            mobile_number: credentials?.phone,
            otp: credentials?.otp,
            login_device_details: deviceDetails
          });
      
          return {
            id: response.data.user_id,  // Use user_id as the id
            phone: credentials?.phone,
            accessToken: response.data.token,
            user_id: response.data.user_id,
            is_host: response.data.is_host,
            is_new_user: response.data.is_new_user
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.phone = user.phone;
        token.user_id = user.user_id;
        token.is_host = user.is_host;
        token.is_new_user = user.is_new_user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.phone = token.phone;
      session.user.user_id = token.user_id;
      session.user.is_host = token.is_host;
      session.user.is_new_user = token.is_new_user;
      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
});

export { handler as GET, handler as POST };