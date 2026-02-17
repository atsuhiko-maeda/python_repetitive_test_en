# <select>
# <option>
x = 0# <replace p="1.0" from='0' to='[0,0,0,2,3]' />
while x <= 5:# <replace p="1.0" from='5' to='["2","3"]' /><replace p="1.0" from='"<="' to='["<=","<"]' />
    x += 1# <replace p="0.2" from='"    "' to='["","    "]' />
    print(x)# <replace p="0.5" from='"    "' to='["","    "]' />
# </option>
# <option>
x = 0# <replace p="1.0" from='0' to='[0,0,0,2,3]' />
while x <= 5:# <replace p="1.0" from='5' to='["2","3"]' /><replace p="1.0" from='"<="' to='["<=","<"]' />
    print(x)
    x += 1
# </option>
# </select>