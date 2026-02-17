# <replaceAll targets='["_FUNC1_"]' with='["foo","bar","baz"]' />
# <select>
# <option>
def _FUNC1_(a,b,c):#<replace p="0.2" from='"def "' to='[""]' /><replace p="0.2" from='":"' to='[""]' /><replace p="0.2" from='"a,b,c"' to='["a+b+c",""]' />
    w = a+b+c # <replace p="0.1" from='"    "' to='[""]' />
    return w # <replace p="0.1" from='"    "' to='[""]' /><replace p="0.1" from='"return "' to='[""]' />

x = 1# <replace p="0.5" from='"1"' to='["2","3"]' />
print(_FUNC1_(x,x,x))
print(_FUNC1_(2,2,2))# <skipLine p="0.7" />
# </option>
# <option>
def _FUNC1_(a,b,c):#<replace p="0.2" from='"def "' to='[""]' /><replace p="0.2" from='":"' to='[""]' /><replace p="0.2" from='"a,b,c"' to='["a+b+c",""]' />
    return a+b+c # <replace p="0.1" from='"    "' to='[""]' /><replace p="0.1" from='"a+b+c"' to='["w","w=a+b+c"]' /><replace p="0.1" from='"return "' to='[""]' />

print(_FUNC1_(1,1,1))
print(_FUNC1_(2,2,2))# <skipLine p="0.7" />
# </option>
# <option>
_FUNC1_(1,1,1)# <skipLine p="0.8" />

def _FUNC1_(a,b,c):#<replace p="0.2" from='"def "' to='[""]' /><replace p="0.2" from='":"' to='[""]' /><replace p="0.2" from='"a,b,c"' to='["a+b+c",""]' />
    print(a+b+c) # <replace p="0.1" from='"    "' to='[""]' /><replace p="0.1" from='"a+b+c"' to='["w","w=a+b+c"]' /><replace p="0.1" from='"return "' to='[""]' />

_FUNC1_(1,1,1)# <skipLine p="0.5" />
_FUNC1_(2,2,2)# <skipLine p="0.7" />
# </option>
# </select>




