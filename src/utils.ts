import validUrl from 'valid-url';
import { nanoid } from 'nanoid';
import Url from './models/url-model';


const getNewUrl = async (longUrl: string) => {
    const baseUrl: string | undefined = process.env.BASE_URL;

    if (!validUrl.isHttpsUri(baseUrl)) {
        throw new Error('invalid base url');
    }

    const urlCode = nanoid(6);

    if (validUrl.isHttpUri(longUrl) || validUrl.isHttpsUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if (url) {
                return {
                    newUrl: url.shortUrl
                };
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                return {
                    newUrl: url.shortUrl
                };
            }
        } catch (err) {
            throw new Error('Server error');
        }
    } else {
        throw new Error('invalid long url');
    }
}

export default getNewUrl;