import { getSession } from 'next-auth/client'
import dbConnect from '../../../utils/dbConnect'
import Tournament from '../../../models/Tournament'

export default async(req, res) => {
    const session = await getSession({ req });

    if (!session.user?.email) {
        res.status(400).json({error: "Please re-login!"});
        return;
    }

    if (session) {
        const {
            query: { id }
        } = req;

        if (!id) {
            res.status(400).json({success: false});
            return;
        }

        await dbConnect();

        try {
            await Tournament.findOneAndRemove({authorId: session.user.email, _id: id});
            res.status(201).json({success: true});
        }
        catch(error) {
            res.status(400).json({success: false});
        }
    }
}