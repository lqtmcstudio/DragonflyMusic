(function () {
    const PLUGIN_INFO = JSON.stringify({
        uid: '85e91dc3-e306-4d95-b611-d32e35b3d59d',
        name: '时迁音源-赞助版',
        version: '1.0.0-beta',
        description: '时迁酱赞助版接口,需要apikey,全音质 转写by LQT',
        support: ['tx','wy','mg','kg','kw']
    });
    const list   = ['128k','320k','flac','flac24bit','hires','atmos','master'];
    const names  = ['standard','exhigh','lossless','lossless+','hires','atmos','master'];
    const sources = {
        kw: { qualitys: ['128k','320k','flac','flac24bit','hires'] },
        mg: { qualitys: ['128k','320k','flac','flac24bit','hires'] },
        kg: { qualitys: ['128k','320k','flac','flac24bit','hires','atmos','master'] },
        tx: { qualitys: ['128k','320k','flac','flac24bit','hires','atmos','atmos_plus','master'] },
        wy: { qualitys: ['128k','320k','flac','flac24bit','hires','atmos','master'] },
    };
    function pickQuality(source, quality) {
        const supported = sources[source]?.qualitys;
        if (!supported || supported.length === 0) return list[0];
        const idx = names.indexOf(quality);
        const q   = list[idx] || list[0];
        return supported.includes(q) ? q : supported[supported.length - 1];
    }
    async function getMusicUrl(source,id,quality,key="") {
        quality = pickQuality(source,quality);
        const url = `https://source.shiqianjiang.cn/api/music/url?source=${source}&songId=${id}&quality=${quality}`;
        const headers = {
            'Content-Type': 'application/json',
            'X-API-Key': "d515eefe35017dfe9232c0376cc700f463faa3e2530b168879afe5ce658dd4a7",
            'User-Agent': 'CeruMusic-Plugin/v1'
        };
        try {
            const resultStr = await customFetch(url, { method: 'GET', headers: headers });
            const data = JSON.parse(resultStr);
            return data['url'];
        } catch (error) {
            try {
                return await getMusicUrl(source,id,'exhigh');
            } catch (error) {
                console.log(`解析错误:${error}`);
                throw error;
            }
        }
    }
    globalThis.MusicPlugin = {
        info: PLUGIN_INFO,
        getMusicUrl,
    };
})();
