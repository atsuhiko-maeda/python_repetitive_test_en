# <replaceAll targets='["_FUNC1_"]' with='["foo","bar","baz"]' />
def _FUNC1_(val=0):
    st = 'a'
    if val > 100:# <replace p="0.5" from='">"' to='[">=","<=","=="]' /><replace p="0.7" from='"100"' to='["50","75","25"]' />
        st='b'        
# <includeBlock p="0.5">
    elif val > 60:# <replace p="0.5" from='"elif"' to='["if"]' /><replace p="0.5" from='"60"' to='["59","75","25","100","120","200"]' />
        st='c'        
# </includeBlock>
    else:# <replace p="0.1" from='":"' to='[" val<10:"]' />
        st='d'
        
    return st

#関数の呼出し
print(_FUNC1_(60))# <replace p="1.0" from='60' to='[50, 40, 30, 20, 10,""]' />
print(_FUNC1_(100))# <replace p="1.0" from='100' to='[100, 150, 200, 250, 300,""]' />
