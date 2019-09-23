<template>
<div>
    <el-cascader 
        v-model="areaValue"
        :options="options" 
        :props="props" 
        :disabled="disabled||submitIng"
        :placeholder="submitIng?'加载中...':placeholder"
        @change="onChange"
    ></el-cascader>
</div>
</template>
<script>
// 自定义组件双向数据绑定 参考i: https://www.jb51.net/article/129098.html
export default {
    name:'area_select',
    data(){
        return {
            areaValue:[],
            submitIng:false
        }
    },
    props:{
        value:Array,
        placeholder:{
            type:String,
            default:'请选择'
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        areaValue:{
            handler:function(val,oldVal){
                this.$emit('input',val);
            },
            // deep:true,
        },
        value:{
            handler:function(val,oldVal){
                this.areaValue = val;
            },
            // deep:true
        }
    },
    computed:{
        options(){
            return this.$store.state.area.province;
        },
        props(){
            let me = this;
            return {
                label:'name',
                value:'id',
                lazy:me.options.length!==0,
                lazyLoad(node,resolve){
                    me.$store.dispatch('getArea',{parentId:node.data.id,callBack(data){
                        resolve(data);
                    }})
                },
            }
        }
    },
    methods:{
        onChange(){
            this.$emit('input',this.value);
            this.$emit('change',this.value);
             
        },
        setData(val){
            let me = this;
            if(val.length===2){
                this.submitIng = true;
                this.$store.dispatch('getAreaBoth',{
                    parentId:val[0],
                    callBack(){
                        me.submitIng = false;
                        me.areaValue = val;
                    }
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>

</style>