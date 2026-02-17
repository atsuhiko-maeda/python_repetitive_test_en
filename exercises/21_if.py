# <replaceAll targets='["elif"]' with='["elif","if"]' />
# <select>
# <option>
x=10 # <replace p="1.0" from='10' to='[1,2,3,4,5,6,7,8,9,10]' />
if x<10:
    print("a")
# <includeBlock p="0.5">
elif x<20:
    print("b")
# </includeBlock>
# <includeBlock p="0.5">
else:
    print("d")
# </includeBlock>
# </option>
# <option>
cnd = True# <replace p="1.0" from='"True"' to='["True","False"]' />
if cnd:# <replace p="1.0" from='"cnd"' to='["not cnd","cnd","cnd and True","cnd or True"]' />
    print("a")
else:
    print("b")
# </option>
# <option>
x=10 # <replace p="1.0" from='10' to='[1,2,3,4,5,6,7,8,9,10]' />
if 3<x and x<=7:# <replace p="1.0" from='3' to='[1,2,3,4,5]' /><replace p="1.0" from='7' to='[6,7,8,9,10,11]' />
    print("a")
else:
    print("b")
# </option>
# <option>
x=10 # <replace p="1.0" from='10' to='[1,2,3,4,5,6,7,8,9,10]' />
if x<=3 or 7<=x:# <replace p="1.0" from='3' to='[1,2,3,4,5]' /><replace p="1.0" from='7' to='[6,7,8,9,10,11]' />
    print("a")
else:
    print("b")
# </option>
# <option>
x=10 # <replace p="1.0" from='10' to='[1,2,3,4,5,6,7,8,9,10]' />
if 3<x:# <replace p="1.0" from='3' to='[1,2,3,4,5]' />
    if x<=7:# <replace p="1.0" from='7' to='[6,7,8,9,10,11]' />
        print("a")
    else:
        print("c")        
else:
    print("b")
# </option>
# <option>
x=10 # <replace p="1.0" from='10' to='[1,2,3,4,5,6,7,8,9,10]' />
if 3<x:# <replace p="1.0" from='3' to='[1,2,3,4,5]' />
    if x<=7:# <replace p="1.0" from='7' to='[6,7,8,9,10,11]' />
        print("a")
    else:
        print("c")        
else:
    print("b")
# </option>
# </select>
