s=2# <replace p="1.0" from='2' to='["2","3"]' />
while s>0:
    print("a")# <skipLine p="0.6" />
# <select>
# <option>
    if s%2==0:
        print(s)
    s-=1
# </option>
# <option>
    print(s)
    s-=2
# </option>
# <option>
    print(s)
    s-=1
# </option>
# </select>
print("b")# <skipLine p="0.6" />