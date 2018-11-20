import { getAxiosSpotifyInstance } from './driver';

import Track from './models/track/track';
import AudioAnalysis from './models/track/audio-analysis';
import AudioFeatures from './models/track/audio-features';

export const getSeveralTracks = async (ids: string[]) => {
    if (ids.length > 50) {
        const exceptionLink =
            'https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-tracks/';
        throw new Error(
            `The maximum number of tracks is 50. See ${exceptionLink} for details`
        );
    }
    const params = { ids: ids.join(',') };
    const response = await getAxiosSpotifyInstance().get('/tracks', { params });
    return response.data.tracks.map((trackJson: any) => new Track(trackJson));
};

export const getTrack = async (id: string) => {
    const response = await getAxiosSpotifyInstance().get(`/tracks/${id}`);
    return new Track(response.data);
};

export const getAudioAnalysisForTrack = async (id: string) => {
    const response = await getAxiosSpotifyInstance().get(
        `/audio-analysis/${id}`
    );
    return new AudioAnalysis(response.data);
};

export const getAudioFeaturesForTrack = async (id: string) => {
    const response = await getAxiosSpotifyInstance().get(
        `/audio-features/${id}`
    );
    return new AudioFeatures(response.data);
};

export const getAudioFeaturesForSeveralTracks = async (ids: string[]) => {
    const params = { ids: ids.join(',') };
    const response = await getAxiosSpotifyInstance().get(`/audio-features`, {
        params,
    });
    return response.data.audio_features.map(
        (audioFeaturesJson: any) => new AudioFeatures(audioFeaturesJson)
    );
};
