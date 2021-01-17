import _ from "lodash";
import { Howl, Howler } from "howler";
const BASE_DIR = "src/";

interface audios {
  [name: string]: Howl;
}

export default class Audio {
  private static _volume = 0.2;
  private static _isLoop = false;
  private static _isMute = false;
  private static _audios: audios = {};
  private static _audioList: string[] = [];
  private static _idList: number[] = [];
  private static _bgm: Howl;

  private static _instance: Audio;

  constructor(props: Partial<Audio> = {}) {
    Object.assign(this, props);
  }

  static init(props: Partial<Audio> = {}) {
    Audio.Instance(props);
    Howler.mute(this._isMute);
    Howler.volume(this._volume);
  }

  static Instance(props: Partial<Audio> = {}): Audio {
    return this._instance || (this._instance = new this(props));
  }

  static mute(isMute = true) {
    this._isMute = isMute;
    Howler.mute(isMute);
  }

  static changeVolume(volume: number) {
    this._volume = volume;
    Howler.volume(volume);
  }

  static async play(name: string, isLoop = Audio._isLoop): Promise<Howl> {
    if (!Audio._audios[name] || isLoop !== this._isLoop) {
      Audio._audios[name] = await this._getAudio(name, isLoop);
    }
    Audio._audios[name].play();
    return Audio._audios[name];
  }

  static stop(name: string) {
    if (!Audio._audios[name]) return;
    Audio._audios[name].loop(false);
    Audio._audios[name].stop();
  }

  static async playBGM(name: string): Promise<Howl> {
    // @ts-ignore
    if (`${BASE_DIR}audios/${name}.mp3` === Audio._bgm?._src) {
      return Audio._bgm;
    }

    this.stopBGM();

    const ids: number[] = [];
    const isNoFade = name === "bgm_nogravity";
    let sprite: any;
    switch (name) {
      case "bgm":
        sprite = {
          start: [0, 8447],
          main: [8448, 49153],
          last: [57600, 8447],
        };
        break;
      case "bgm_nogravity":
        sprite = {
          start: [0, 1000], // 使わない
          main: [0, 540000, true],
          last: [0, 1000], // 使わない
        };
        break;
      case "bgm_congrats":
        sprite = {
          start: [0, 10664],
          main: [10665, 10668],
          last: [21333, 10664],
        };
        break;
    }

    const opts: any = {
      src: [`${BASE_DIR}audios/${name}.mp3`],
      sprite,
      onend(id: number) {
        if (isNoFade) return;
        switch (id) {
          case ids[0]:
            Audio._bgm.play(ids[1]);
            break;
          case ids[1]:
            Audio._bgm.play(ids[2]);
            Audio._bgm.fade(1, 0, sprite.start[1], ids[2]);
            Audio._bgm.play(ids[0]);
            Audio._bgm.fade(0, 1, sprite.start[1], ids[0]);
            break;
        }
      },
    };
    Audio._bgm = await Audio._loadBGM(opts);

    const ary = ["start", "main", "last"];
    ary.map((key: string, idx: number) => {
      ids.push(Audio._bgm.play(key));
      Audio._bgm.pause(ids[idx]);
    });

    if (isNoFade) {
      Audio._bgm.play(ids[1]);
    } else {
      Audio._bgm.play(ids[0]);
    }

    return Audio._bgm;
  }

  static stopBGM() {
    if (!Audio._bgm) return;
    Audio._bgm.stop();
    Audio._bgm.off("end");
  }

  static async addQueue(audioList: string[]): Promise<audios> {
    this._audioList = [...this._audioList, ...audioList];
    return (Audio._audios = await this._storeAudio());
  }

  static dispose() {
    for (let a of Object.values(Audio._audios)) {
      a.unload();
    }
  }

  static get isPlaying(): boolean {
    return Audio._idList.length > 0;
  }

  private static _loadBGM(opts: any): Promise<Howl> {
    return new Promise((resolve) => {
      const audio = new Howl(opts);
      if (audio.state() === "loaded") resolve(audio);
      audio.once("load", () => resolve(audio));
      audio.on("loaderror", () => {
        console.error(`Load error: ${name}.mp3`);
        resolve();
      });
    });
  }

  private static _storeAudio(): Promise<audios> {
    return Promise.all(
      this._audioList.map(
        (name) =>
          new Promise<Howl>((resolve) => {
            const audio = this._getAudio(name, this._isLoop);
            if (audio.state() === "loaded") resolve(audio);
            audio.once("load", () => resolve(audio));
            audio.on("loaderror", () => {
              console.error(`Load error: ${name}.mp3`);
              resolve();
            });
          })
      )
    )
      .then(
        (list): audios =>
          list.reduce((obj: audios, data: Howl, index: number) => {
            obj[this._audioList[index]] = data;
            return obj;
          }, {})
      )
      .catch(() => {
        console.error("audio load error");
        return {};
      });
  }

  private static _getAudio(name: string, loop = Audio._isLoop): Howl {
    return new Howl({
      src: [`${BASE_DIR}audios/${name}.mp3`],
      loop,
      onplay(id) {
        Audio._idList.push(id);
      },
      onend(id) {
        _.pull(Audio._idList, id);
      },
    });
  }
}
