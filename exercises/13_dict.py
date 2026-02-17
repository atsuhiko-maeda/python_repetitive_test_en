# <replaceAll targets='["_dict"]' with='["my_dict","d","f"]' />
# <replaceAll targets='["_B_"]' with='["\"orange\"","\"cherry\"","\"apple\"", "apple", "orange"]' />
_dict = {"apple":100,"orange":80}
# <select>
# <option>
print(_dict[_A_])# <replace p="1.0" from='"_A_"' to='["\"orange\"","\"cherry\"","\"apple\"", "apple", "orange"]' />
# </option>
# <option>
print("apple" in _dict)# <replace p="0.8" from='"apple"' to='["orange","cherry","apple"]' />
# </option>
# <option>
_dict[_B_]=200# <replace p="0.8" from='"="' to='["=","-=","+="]' /># <replace p="0.8" from='200' to='[150,250,300,10,20,30]' />
print(_dict[_B_])
# </option>
# </select>