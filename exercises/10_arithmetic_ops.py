# <replaceAll targets='["_VAR_"]' with='["x","y","a","b"]' />
# <select>
# <option>
_VAR_=1 # <replace p = "1.0" from = "1" to= "[0,2,4,6,8]" />
# </option>
# <option>
_VAR_=a+b*c # <replace p = "1.0" from = '"a"' to= '["2","4"]' /><replace p = "1.0" from = '"b"' to= '["2","3"]' /><replace p = "1.0" from = '"c"' to= '["1","2"]' />
# </option>
# <option>
_VAR_=(a+b)*c # <replace p = "1.0" from = '"a"' to= '["1","2"]' /><replace p = "1.0" from = '"b"' to= '["1","2"]' /><replace p = "1.0" from = '"c"' to= '["2"]' />
# </option>
# </select>
print(_VAR_)
_VAR_=3 # <replace p="1.0" from='"=3"' to='["=_VAR_+2","=_VAR_-2","=_VAR_/2","=_VAR_//2","=_VAR_*2","=_VAR_%2","*=2","-=2","+=2","-=1","+=1","/=2","%=2","%=3"]' />
print(_VAR_)
_VAR_=3 # <replace p="1.0" from='"=3"' to='["==_VAR_+1","+1","=+1","=_VAR_/2","=_VAR_//2","*=2","-=2","+=2","-=1","+=1","/=2","%=2","%=3"]' />
print(_VAR_)

# <explanation>
# ポイント: 
# ・/で割った結果はfloat型
# ・//で割った結果はint型(小数点以下切り捨て)
# ・=は代入，==は比較
# ・%は割ったときの余り
# </explanation>