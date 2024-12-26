import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import RequestHelper from "@/app/api/helpers/requestHelper";
import { DB_PATHS, RES_STATUS } from "@/app/api/constants/commonConst";

export async function PATCH(request: NextRequest, response: NextResponse) {
    // Handle POST request
    try {
        const body = await RequestHelper.parseBody(request);

        fs.writeFileSync(DB_PATHS.Header, JSON.stringify(body, null, 2));

        const data = { message: "Data updated successfully" };

        return new Response(JSON.stringify(data), {
            status: RES_STATUS.success,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "header"
        };

        return new Response(JSON.stringify(data),
            {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
