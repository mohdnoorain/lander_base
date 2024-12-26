import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import RequestHelper from "@/app/api/helpers/requestHelper";
import { DB_PATHS, RES_STATUS } from "@/app/api/constants/commonConst";

export async function POST(request: NextRequest, response: NextResponse) {
    // Handle POST request
    try {
        const body = await RequestHelper.parseBody(request);

        const { username, password } = body;

        const fileData = fs.readFileSync(DB_PATHS.Auth, "utf-8");
        const authData = JSON.parse(fileData);

        if (authData?.username == username && authData?.password == password) {

            const token = new Date().toISOString();
            if (authData?.sessions?.length >= 3) {
                authData.sessions = [token];
            } else {
                authData.sessions.push(token);
            }

            fs.writeFileSync("db/auth.json", JSON.stringify(authData, null, 2));

            const data = { message: "Login success", token };
            return new Response(JSON.stringify(data), {
                status: RES_STATUS.success,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            const data = { message: "Invalid credentials!" };

            return new Response(JSON.stringify(data), {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" },
            });
        }

    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "auth/login"
        };

        return new Response(JSON.stringify(data),
            {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
