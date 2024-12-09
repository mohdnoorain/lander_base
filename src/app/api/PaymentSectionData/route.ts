import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    message: string;
};

export function GET(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const PaymentSection = {
        LocationUrl: "https://unitedestates.com/wp-content/uploads/2022/11/Binghatti-1.2-1024x576.jpg",
        paymentPlans: [
            "60% During Construction",
            "40% On Handover",
            "Q4 2023 TO Q1 2024",
        ],
    };
    return Response.json(PaymentSection);
}
