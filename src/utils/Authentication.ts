import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Authentication {
    public static PasswordHash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10)
    }

    public static PasswordCompare = async (text: string, encyptedText: string): Promise<Boolean> => {
        return await bcrypt.compare(text, encyptedText);
    }

    public static generateToken = (id: number, username: string, password: string): string => {
        const secretkey: string = process.env.JWT_SECREAT_KEY || "ICIP1998";

        const token: string = jwt.sign({ id, username, password}, secretkey);
        return token;
    }
}
export default Authentication;