import dbConnect from '../../utils/dbConnect'
import Tournament from '../../models/Tournament'
import { CETDate } from '../../global/Global'
import { getSession } from 'next-auth/client'

const hasHttpPrefix = (input) => input.startsWith("http://") || input.startsWith("https://");

export default async(req, res) => {
    if (req.method === 'POST') {
        const session = await getSession({ req });

        if (!session.user?.name || !session.user?.email) {
            res.status(400).json({error: "Please re-login!"});
            return;
        }

        if (session) {
            var body = JSON.parse(req.body);
            if (!body.name || (!body.challonge && !body.smashgg && !body.discord)) {
                res.status(400).json({error: "Fields were missing!"});
                return;
            }

            body.state = 0;
            body.authorName = session.user.name;
            body.authorId = session.user.email;

            if (!body.datetime) {
                delete body.time;
            } else if (body.datetime < CETDate) {
                res.status(400).json({error: "The date and time you have specified is before the current CET time!"});
                return;
            }
            if (!body.challonge) {
                delete body.challonge;
            } else {
                if (!hasHttpPrefix(body.challonge))
                    body.challonge = "https://" + body.challonge;
            }
            if (!body.smashgg) {
                delete body.smashgg;
            } else {
                if (!hasHttpPrefix(body.smashgg))
                    body.smashgg = "https://" + body.smashgg;
            }
            if (!body.discord) {
                delete body.discord;
            } else {
                if (!hasHttpPrefix(body.discord))
                    body.discord = "https://" + body.discord;
            }

            await dbConnect();
            try {
                const count = await Tournament.count({authorId: body.authorId, state: 2});
                if (count >= 10) {
                    res.status(201).json({error: "You already have 10 submissions! You have to remove your tournaments before putting new ones!"});
                    return;
                }

                await Tournament.create(body);
                res.status(201).json({success: true});
            }
            catch(error) {
                console.log(error)
                res.status(400).json({success: false});
            }
        } else {
            res.status(400).json({success: false});
        }
    } else {
        res.status(400).json({success: false});
    }
}