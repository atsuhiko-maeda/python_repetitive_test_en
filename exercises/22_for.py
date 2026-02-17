# <replaceAll targets='["_VAR_"]' with='["i","n"]' />
print("a") # <skipLine p="0.5" />
# <select>
# <option>
for _VAR_ in range(2): # <replace p="1.0" from="2" to='["2, 3","1, 3","0, 3", "2, 3", "1, 7, 2", "3, 0, -1", "0, 7, 2"]' />
# </option>
# <option>
for _VAR_ in [0,1,2]: # <replace p="1.0" from='"[0,1,2]"' to='["[0,1,2]","[1,2]"]' />
# </option>
# </select>
    print("b") # <replace p="0.5" from='"\"b\""' to='["_VAR_"]' />
    print("c") # <skipLine p="0.2" />
print("d") # <skipLine p="0.5" />

# <explanation>
# ポイント: 
# ・range(3)-->0,1,2・・・3は含まない
# ・range(1, 3)-->1,2・・・1は含み，3は含まない
# ・mylist[0:2]・・・0,1番目（2番は含まない）
# ・mylist[0:-2]・・・0〜後ろから1番目（-2番は含まない）
# ・[0,1,2]・・・for文で使うと，すべて抽出される
# </explanation>