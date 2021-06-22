class Lion extends eui.Component {
    private _ani: egret.MovieClip;
    private _position: Point;
    private stateManager: StateMachine<Lion>;
    private _speed: number = 3;
    private _dir: Point;
    public get ani(): egret.MovieClip {
        return this._ani;
    }
    public get position() {
        return this._position;
    }
    public get speed() {
        return this._speed;
    }
    public get dir(): Point {
        return this._dir;
    }
    public set dir(dir) {
        this._dir = dir;
    }
    constructor(ani: egret.MovieClip) {
        super();
        this._ani = ani;
        this._position = new Point();
        this._position.x = ani.x;
        this._position.y = ani.y;
        this.stateManager = new StateMachine<Lion>(this);
        this.stateManager.SetInitState(new IdelState_Lion());
    }
    /**移动动作 */
    public StartMoveTo(point: Point[], callBack?: Function) {
        let moveState = new MoveState_Lion(point, callBack);
        this.stateManager.ChangeState(moveState);
    }
    /**站动作 */
    public Stand() {
        let idelState = new IdelState_Lion();
        this.stateManager.ChangeState(idelState);
    }
    /**根据某个方向位移（非移动动作） */
    public Move(dir: Point) {
        this._dir = dir;
        this._position.x += this._dir.x * this._speed;
        this._position.y += this._dir.y * this._speed;
        this._ani.x = this._position.x;
        this._ani.y = this._position.y;
    }
    /**赢得奖品动作 */
    public GetReward(reward: number[], callBack?: Function) {
        let GetRewardState = new GetRewardState_Lion(reward, callBack);
        this.stateManager.ChangeState(GetRewardState);
    }
    /**瞬移到某个位置动作 */
    public FlyTo(position: Point, callBack1?: Function, callBack2?: Function) {
        let changePosState = new ChangePosState_Lion(position, callBack1, callBack2);
        this.stateManager.ChangeState(changePosState);
    }
    public Victory() {
        let VictoryState = new VictoryState_Lion();
        this.stateManager.ChangeState(VictoryState);
    }
    /**设置狮子的位置 */
    public setPosition(pos: Point) {
        this._position.x = pos.x;
        this._position.y = pos.y;
        this._ani.x = this._position.x;
        this._ani.y = this._position.y;
    }
    public OnUpdate() {
        this.stateManager.ExcuteCurState();
    }
}