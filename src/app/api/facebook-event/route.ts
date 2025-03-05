import { NextResponse } from 'next/server';

export async function POST() {
    const url = 'https://graph.facebook.com/v21.0/3936983083294720/events';
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    const eventData = {
        data: [
            {
                event_name: 'Visit_Event',
                event_time: Math.floor(Date.now() / 1000), // Current timestamp
                action_source: 'website',
                user_data: {
                    em: [null],
                    ph: [null]
                },
                attribution_data: {
                    attribution_share: '0.3'
                },
                custom_data: {
                    currency: 'INR',
                    value: '199'
                },
                original_event_data: {
                    event_name: 'Visit_Event',
                    event_time: Math.floor(Date.now() / 1000)
                }
            }
        ]
    };

    try {
        const response = await fetch(`${url}?access_token=${accessToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Failed to send event');
        }

        return NextResponse.json({ success: true, response: data }, { status: 200 });
    } catch (error) {
        console.error('Facebook Event Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}