# <replaceAll targets='["_FUNC_"]' with='["foo","bar","baz"]' />
# <replaceAll targets='["_VAR_"]' with='["x","a","y"]' />
_VAR_ = 10 # <replace p="0.7" from='"10"' to='["1","2","3"]' />
def _FUNC_():
    global _VAR_ # <skipLine p="0.5" />
    _VAR_=5 # <replace p="0.7" from='"=5"' to='["=4","=_VAR_+5","*=6"]' />
    print(_VAR_)

print(_VAR_) # <skipLine p="0.2" />
_FUNC_()
print(_VAR_)

# <explanation>
# Key points:
# - Assigning to a variable inside a function creates a local variable by default
# - To modify a global variable inside a function, use the "global" declaration
# - You can read a global variable without "global" — only writing requires it
# </explanation>