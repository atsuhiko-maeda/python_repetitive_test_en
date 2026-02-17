# <replaceAll targets='["_VAR_"]' with='["data","mylist","vals","temp"]' />
# <select>
# <option>
_VAR_ = (10,20,30,40,50)
_VAR_[0] = 3# <skipLine p="0.5" /><replace p = "1.0" from = "0" to= "[0,1,2]" /><replace p = "1.0" from = "3" to= '["0","-1"]' />
# </option>
# <option>
_VAR_ = [10,20,30,40,50]
# </option>
# </select>

# <select>
# <option>
print(_VAR_[0])# <replace p = "1.0" from = "0" to= "[0,1,2,3,4,-1,-2]" />
# </option>
# <option>
print(_VAR_[0])# <replace p = "1.0" from = '0' to= '["0:1","0:2","0:3","1:2","1:3","2:4","0:-1","0:-2"]' />
# </option>
# <option>
print(_VAR_[0])# <replace p = "1.0" from = "0" to= '[":1",":2",":3","1:","2:","3:"]' />
# </option>
# </select>

# <explanation>
# ポイント: 
# ・リストは[1, 2, 3]，タプルは(1, 2, 3)のように作成
# ・リストは変更可，タプルは変更不可
# ・アクセス時はどちらも同じ．list[0]，tuple[0]
# ・開始番号は含み，終わり番号は含まない.（a[0:2]のとき2番は含まない）
# </explanation>