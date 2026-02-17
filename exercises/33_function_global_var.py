# <replaceAll targets='["_FUNC_"]' with='["foo","bar","baz"]' />
# <replaceAll targets='["_VAR_"]' with='["x","a","y"]' />
_VAR_ = 10 # <replace p="0.7" from='"10"' to='["1","2","3"]' />
def _FUNC_():
    global _VAR_ # <skipLine p="0.5" />
    _VAR_=5 # <replace p="0.7" from='"=5"' to='["=4","=_VAR_+5","*=6"]' />
    print(_VAR_)

print(_VAR_) # <skipLine p="0.2" />
_FUNC_()
print(_VAR_)

# <explanation>
# ポイント: 
# ・関数内で変数に代入するとデフォルトはローカル変数になる
# ・関数内でグローバル変数を更新したい場合はglobal宣言が必要
# ・グローバル変数の値を参照するだけならはglobal宣言は不要
# </explanation>