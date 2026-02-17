
#実行結果を予想して入力せよ
# <replaceAll targets='["_FUNC1_","_FUNC2_","_FUNC3_"]' with='["foo","bar","baz"]' />
# <select>
# <option>
def _FUNC3_():
    print("a")
    
def _FUNC2_():
    print("b") # <skipLine p="0.5" />
    _FUNC3_()
# </option>
# <option>
def _FUNC2_():
    print("b")
# </option>
# </select>

def _FUNC1_():
    print("c") # <skipLine p="0.5" />
    _FUNC2_()
    print("d") # <skipLine p="0.5" />

print("e") # <skipLine p="0.5" />
_FUNC1_()
    
        

