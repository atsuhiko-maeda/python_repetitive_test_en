# <replaceAll targets='["_FUNC1_"]' with='["foo","bar","baz"]' />
def _FUNC1_( vals ):
    n=0 
    for x in vals:
# <select>
# <option>
        if x % 2 == 0:
            print(x)
            n+=1
    return n# <replace p="0.5" from='"    "' to='["    ","        "]' />
# </option>
# <option>
        print(x)
        n+=1 # <replace p="1.0" from='"1"' to='["x", "1"]' />
    return n# <replace p="0.5" from='"    "' to='["    ","        "]' />
# </option>
# <option>
        print(x)
        n=n+1 # <replace p="1.0" from='"1"' to='["x", "1"]' />
    return n# <replace p="0.5" from='"    "' to='["    ","        "]' />
# </option>
# </select>


nlist = [1,2,3,4]# <replace p="0.5" from='"1,2,3,4"' to='["0,1,2,3"]' />
print(_FUNC1_(nlist))
