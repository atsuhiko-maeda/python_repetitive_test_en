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
# Key points:
# - Lists use [ ], e.g. [1, 2, 3]; tuples use ( ), e.g. (1, 2, 3)
# - Lists are mutable; tuples are immutable
# - Both are accessed the same way: list[0], tuple[0]
# - Slicing is start-inclusive, end-exclusive: a[0:2] includes indices 0 and 1, not 2
# </explanation>