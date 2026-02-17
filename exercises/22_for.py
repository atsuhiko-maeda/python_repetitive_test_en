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
# Key points:
# - range(3) --> 0, 1, 2  (3 is excluded)
# - range(1, 3) --> 1, 2  (1 is included, 3 is excluded)
# - mylist[0:2] --> elements at index 0 and 1 (index 2 excluded)
# - mylist[0:-2] --> from index 0 up to (not including) the second-to-last element
# - Iterating over a list [0,1,2] with for yields all elements in order
# </explanation>