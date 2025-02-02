import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import { NextRequest, NextResponse } from 'next/server';
import RequestHelper from '../helpers/requestHelper';
import { DB_PATHS, RES_STATUS } from '../constants/commonConst';

type ResponseData = [string];

export function GET(
    req: NextRequest
) {
    try {
        // const fileData = fs.readFileSync(DB_PATHS.GallerySection, "utf-8");
        // const GallerySection = JSON.parse(fileData);
        return Response.json([
            "https://unitedestates.com/wp-content/uploads/2022/11/311710769_200494399033739_7424501755099942867_n.jpg",
            "https://unitedestates.com/wp-content/uploads/2022/11/Binghatti-pool.jpg",
            "https://unitedestates.com/wp-content/uploads/2022/11/binghatti-2.png",
            "https://unitedestates.com/wp-content/uploads/2022/11/Binghatti-1..jpg",
            "https://unitedestates.com/wp-content/uploads/2022/11/Binghatti-dubai-city-view.jpg"
        ]);

    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/gallerysection"
        };

        return new Response(JSON.stringify(data),
            {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await RequestHelper.parseBody(request);

        const { } = body;
        console.log("body", body);

        fs.writeFileSync(DB_PATHS.GallerySection, JSON.stringify(body, null, 2));

        return new Response(JSON.stringify({}),
            {
                status: RES_STATUS.success,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error: any) {

        const data = {
            message: error?.message || "Oops! something went wrong",
            errorStack: "admin/gallerysection"
        };

        return new Response(JSON.stringify(data),
            {
                status: RES_STATUS.badRequest,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}