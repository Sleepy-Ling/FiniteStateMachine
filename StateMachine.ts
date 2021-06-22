class StateMachine<T>{
    private _target: T;
    private _curState: State<T>;
    constructor(target: T) {
        this._target = target;
    }
    public SetInitState(state: State<T>) {
        this._curState = state;
        this._curState.setTarget(this._target);
        this._curState.onEnterState();
    };
    public ChangeState(state: State<T>) {
        this._curState.onExitState();
        this._curState = state;
        this._curState.setTarget(this._target);
        this._curState.onEnterState();
    };
    public ExcuteCurState() {
        this._curState.onUpdate();
    };
}