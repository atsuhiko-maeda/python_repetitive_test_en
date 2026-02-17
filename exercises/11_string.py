# <replaceAll targets='["_A_","_B_"]' with='["a","b","c","d"]' />
# <replaceAll targets='["_C_"]' with='["message","data","_s","temp"]' />
# <replaceAll targets='["_CONTENT_"]' with='["hello","apple","cat","KAIT"]' />
# <select>
# <option>
z = 1 + 4# <replace p = "1.0" from = '"1"' to= '["1","2","3"]' /><replace p = "1.0" from = '"4"' to= '["1","2","3"]' />
z = str(z)
print(z)
# </option>
# <option>
_A_ = _CONTENT_
z = _A_[]# <replace p = "1.0" from = '"[]"' to= '["[0]","[1]","[0:2]","[2:]"]' />
print(z)
# </option>
# <option>
_A_ = 1# <replace p = "1.0" from = '"1"' to= '["1","2","3"]' />
_B_ = 2# <replace p = "1.0" from = '"2"' to= '["1","2","3"]' />
z = str(_A_) + str(_B_)
print(z)
# </option>
# <option>
_C_ = _CONTENT_
print(_C_)
# </option>
# <option>
'_C_' = _CONTENT_
print(_C_)
# </option>
# <option>
_C_ = "_CONTENT_"
print(_C_)
# </option>
# <option>
num1 = 10# <replace p = "1.0" from = '"10"' to= '["10","20","30"]' />
num2 = 20# <replace p = "1.0" from = '"10"' to= '["10","20","30"]' />
print("{num1},{num2}")
# </option>
# <option>
num1 = 10# <replace p = "1.0" from = '"10"' to= '["10","20","30"]' />
num2 = 20# <replace p = "1.0" from = '"10"' to= '["10","20","30"]' />
print(f"{num1},{num2}")
# </option>
# </select>

# <explanation>
# ポイント: 
# ・f-stringの形式はf"文字列・・・{変数名}・・・文字列"
# </explanation>