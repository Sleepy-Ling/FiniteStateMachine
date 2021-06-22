import Game, { RoomConfig } from "./Game";

export default class Config {
    public static isDebug: boolean = true;
    public static isAuth: boolean = false;  //是否需要平台验证token
    public static isInCDN: boolean = false;  //资源放是否在cdn
    public static has3DHand: boolean = true;

    public static get token(): string {
        if (this.isDebug) {
            return "s57Aq2uzdlf0d";
        }
        return Laya.LocalStorage.getItem("sessionToken");
    }

    public static get URL(): string {
        if (this.isDebug) {
            return "ws://192.168.1.32:5230";
        }
        let url = Laya.LocalStorage.getItem("PLATFORMSELSVR");
        return url;
    }

    /**获取cdn资源目录 */
    public static get CDN(): string {
        let _cdn = Laya.LocalStorage.getItem("CDNADDRESS");
        return `${_cdn}/719/${Game.instance.gameInfo.gameID}/`;
    }

    public static screenWidth: number = 1280;
    public static screenHeight: number = 720;

    /**麻将枚举 */
    public static mahjong = [
        { type: [0], count: 0 },  //空白麻将
        { type: [1], count: 4 },  //飞牌
        { type: [11, 12, 13, 14, 15, 16, 17, 18, 19], count: 4 },  //万子牌(1~9万)
        { type: [21, 22, 23, 24, 25, 26, 27, 28, 29], count: 4 },  //筒子牌(1~9筒)
        { type: [31, 32, 33, 34, 35, 36, 37, 38, 39], count: 4 },  //索子牌(1~9索)
        { type: [41, 42, 43, 44, 45, 46, 47], count: 4 },  //番子牌(东,南,西,北,中,发,白)
        { type: [51, 52, 53, 54, 55, 56, 57, 58], count: 1 },  //花牌(春,夏,秋,冬,梅,兰,菊,竹)
        { type: [61, 62, 63, 64], count: 1 }  //动物牌(猫,鼠,鸡,蜈蚣)
    ];

    /**骰子点数与旋转配置 */
    public static touzi = [
        { x: [90], y: [0], z: [0, 360] },    //1点
        { x: [0], y: [0, 360], z: [0] },     //2点
        { x: [0], y: [0, 360], z: [270] },     //3点
        { x: [270], y: [0], z: [0, 360] },   //4点
        { x: [180], y: [0, 360], z: [0] },   //5点
        { x: [0], y: [0, 360], z: [90] },   //6点
    ];

    /**判断是否有此麻将 */
    public static hasMahjong(id: number): boolean {
        for (let obj of this.mahjong) {
            if (obj.type.indexOf(id) != -1) {
                return true;
            }
        }
        return false;
    }

    /**麻将桌子id */
    public static desk = [0, 1];


    /**判断是否有此桌子 */
    public static hasDesk(id: number): boolean {
        return this.desk.indexOf(id) != -1;
    }

    /**
     * 桌面麻将大小
     * @length x轴方向
     * @width z轴方向
     * @height y轴方向
     */
    public static deskMahjongSize = {
        length: 0.295,
        width: 0.175,
        height: 0.45,
    }

    /**
     * 根据胡牌枚举获取其番数
     * 0-19:10番、20:8番、30:7番、40:5番、50-59:3番、 
     * 60-69:2番、70-80:1番
     * @param type 胡牌枚举
     */
    public static getMahjongTimesByType(type: Enum_HuType): number {
        if (type < 20) {
            return 10;
        }
        else if (type < 30) {
            return 8;
        }
        else if (type < 40) {
            return 7;
        }
        else if (type < 50) {
            return 5;
        }
        else if (type < 60) {
            return 3;
        }
        else if (type < 70) {
            return 2;
        }
        else {
            return 1;
        }
    }

    /**
     * 获取对应类型的龙骨动画名称
     * @param type 胡牌类型
     */
    public static getDragonBonesNameByType(type: number) {
        switch (type) {
            case 1:
            case 4:
            case 10:
            case 12:
                //凤凰
                return 'ani_mymj_phoenix';
            case 2:
            case 6:
            case 13:
            case 14:
                //青龙
                return 'ani_mymj_dragon';
            case 7:
            case 8:
            case 11:
            case 15:
                //白虎
                return 'ani_mymj_tiger';
            case 5:
            case 17:
            case 9:
                //玄武
                return 'ani_mymj_xuanwu';
            case 16:
            case 3:
                //麒麟
                return 'ani_mymj_kirin';
            case 22:
            case 30:
                //鱼
                return 'ani_mymj_fish';
            case 18:
            case 19:
            case 20:
            case 21:
            case 23:
                //熊 
                return 'ani_mymj_bear';
            case 29:
                //猫
                return 'ani_mymj_cat';
            default:
                return null;

        }


    }

    /**
     * 获取对应类型的龙骨动画音效
     * @param type 胡牌类型
     */
    public static getDragonBonesSoundIDByType(type: number) {
        switch (type) {
            case 1:
            case 4:
            case 10:
            case 12:
                //凤凰
                return 62;
            case 2:
            case 6:
            case 13:
            case 14:
                //青龙
                return 59;
            case 7:
            case 8:
            case 11:
            case 15:
                //白虎
                return 63;
            case 5:
            case 17:
            case 9:
                //玄武
                return 64;
            case 16:
            case 3:
                //麒麟
                return 61;
            case 22:
            case 29:
                //鱼
                return 60;
            case 18:
            case 19:
            case 20:
            case 21:
            case 23:
                //熊 
                return 57;
            case 28:
            case 29:
                //猫
                return 58;
            default:
                return null;

        }


    }

    /**胡牌的最大番数 */
    public static maxFan: number = 10;

    /** 通过id获取房间配置 */
    public static getRoomConfigById(roomId: number): RoomConfig {
        let tempRoomConfig = null;
        Game.instance.roomConfigList.forEach((roomConfig) => {
            if (roomConfig.id == roomId) {
                tempRoomConfig = roomConfig;
            }
        });
        return tempRoomConfig
    }

    /**通过level获取对应等级的房间配置 */
    public static getLevelRoomConfig(roomLevel: number, isMatch: number = 1) {
        let tempRoomConfig = null;

        for (let roomConfig of Game.instance.roomConfigList) {
            if (roomConfig.roomLevel == roomLevel && roomConfig.is_match == isMatch) {
                tempRoomConfig = roomConfig;
                break;
            }
        }

        return tempRoomConfig;
    }
}

export enum Area {
    None = 0,
    Color = 1,    //花牌区
    Heap = 2,     //牌墩区
    Discard = 3,  //弃牌区
    Eat = 4,      //碰，吃，杠等区
    Hand = 5,     //手牌区
}

/**麻将组合类型（碰、吃、杠） */
export enum MahjongGroupType {
    /**假吃 */
    FakeChow = 11,
    /**吃 */
    Chow = 12,
    /**假碰 */
    FakePung = 21,
    /**碰 */
    Pung = 22,
    /**小明杠 */
    SmallKong = 31,
    /**大明杠 */
    Kong = 32,
    /**暗杠 */
    ConcealedKong = 33,
}

/**操作类型 */
export enum operation {
    /**胡 */
    Win = 41,
    /**自摸 */
    SelfTakeWin = 42,
    /**赎飞 */
    TakeFlyBack = 51,
}

/**2d场景中区域类型 */
export enum Enum_MyArea2D {
    /**展示区 */
    Display,
    /**提示区 */
    Tips,
    /**手牌区 */
    Hand,
    /**响应区 */
    Response
}

/**胡牌类型 */
export enum Enum_HuType {
    /**起手四飞 */
    FourFlyingHands = 0,
    /**四飞食胡 */
    FourFlyingFoodHu,
    /**邋遢胡 */
    ScruffyHu,
    /**天胡 */
    DayHu,
    /**地胡 */
    LandHu,
    /**九子连环 */
    NineChildSerial,
    /**杠上杠自摸 */
    DrawWinAfterKongToKong,
    /**坎坎胡 */
    KanKanHu,
    /**全大炮 字一色 */
    AllHonortiles,
    /**大四喜 */
    Grand4Happiness,
    /**十八罗汉 */
    EighteenArhats,
    /**十三幺 */
    ThirteenMAO,
    /**幺九 */
    MAONine,
    /**小四喜 */
    Junior4Happiness,
    /**大三元 */
    Tri_Star = 20,   //8
    /**清一色 */
    PureOneSuit = 30,  //7 
    /**小三元 */
    SmallTri_Star = 40, //5
    /**混一色 */
    MixOneSuit = 50,    //3
    /**对对碰 */
    Supperzzle = 51,
    /**杠上自摸 */
    DrawWinAfterKong = 60,   //2
    /**花上自摸 */
    DrawWinAfterFlower,
    /**海底捞月 */
    DrawWinAfterEnd,
    /**抢杠 */
    RobbingAKong = 70,
    /**自摸 */
    DrawWin,
    /**平胡 */
    PingHu,
    /**门风 */
    DealersWind,
    /**圈风 */
    RoundWind,
    /**三元牌 */
    DragonTiles,
    /**食胡 */
    EatHu,
    /**河底捞鱼 */
    EatHuAfterEnd,
    /**动物牌 */
    AnimalHu,
    /**顿飞 */
    FlyHu,
    /**正花 */
    FlowerHu,
}

export enum Enum_SoundID {
    /**牌值基础值 */
    Cards = 1000,
    /**吃 */
    Chow = 34,
    /**杠 */
    Kong = 35,
    /**胡 */
    Win = 36,
    /**自摸 */
    SelfTakeWin = 37,
    Pung = 38,
    /**抢杠 */
    TakeKong = 39,
    /**胡 */
    Win2,
    GreenBgm,
    RedBgm,
    WinSound,
    LoseSound,
    Dice,
    CardMove,
    CountDown,
    CardAdjust,
    SendCard,
    MyTurn,
    /**动作提示音 */
    ActionSound,
    /**吃、碰、杠 */
    Eff_EatSound,
    Eff_Flower,
    Eff_EatAction,
    Eff_SelectCard,
    Eff_Coin,
    Eff_Panda,
    Eff_Cat,
    Eff_Dragon,
    Eff_Fish,
    Eff_Kirin,
    Eff_Phoenix,
    Eff_Tiger,
    Eff_Tortoise
}