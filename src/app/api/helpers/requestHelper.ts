import { NextRequest, NextResponse } from "next/server";

const parseBody = async (request: NextRequest) => {
    try {
        const body = await request.json();
        return body;
    } catch (error) {
        throw new Error("Invalid data");
    }
}

const RequestHelper = {
    parseBody: parseBody
}

export default RequestHelper;