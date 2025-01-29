import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs"
import { DB_PATHS, RES_STATUS } from "../constants/commonConst";
import RequestHelper from "../helpers/requestHelper";
import { NextRequest, NextResponse } from "next/server";
type paymentPlansItem = [string, string];
type ApiResponse = {
    paymentPlans: paymentPlansItem[];
    LocationUrl: string;
};

export function GET(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    try {

        const fileData = fs.readFileSync(DB_PATHS.PaymentSection, "utf-8");
        const PaymentSectionData = JSON.parse(fileData);
        return Response.json(PaymentSectionData

        );

    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/feature"
        };

        return new Response(JSON.stringify(data),
            {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const body = await RequestHelper.parseBody(request);

        const { } = body;
        console.log("body", body);

        fs.writeFileSync(DB_PATHS.PaymentSection, JSON.stringify(body, null, 2));

        return new Response(JSON.stringify({}),
            {
                status: RES_STATUS.success,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/paymentsection"
        };

        return new Response(JSON.stringify(data),
            {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}

